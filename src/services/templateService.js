// CampusLink — Layer 11: Template Service
import { DEFAULT_TEMPLATES, DEMO_PREVIEW_DATA } from '../data/communicationTemplates';

const STORAGE_KEY = 'campuslink_communication_templates';

function getStoredTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TEMPLATES));
      return DEFAULT_TEMPLATES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load communication templates:', e);
    return DEFAULT_TEMPLATES;
  }
}

function saveStoredTemplates(templates) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (e) {
    console.error('Failed to persist communication templates:', e);
  }
}

/**
 * 1. Render template by substituting {{variable}} placeholders with data
 */
export function renderTemplate(template, data = {}) {
  if (!template) return { subject: '', body: '' };

  const merged = { ...DEMO_PREVIEW_DATA, ...data };

  let subject = template.subject || '';
  let body = template.body || '';

  // Variable replacement
  Object.keys(merged).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    const val = merged[key] !== undefined && merged[key] !== null ? String(merged[key]) : '';
    subject = subject.replace(regex, val);
    body = body.replace(regex, val);
  });

  // Handle simple conditionals like {{#if score}}...{{/if}}
  body = body.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (match, conditionKey, innerContent) => {
    return merged[conditionKey] ? innerContent : '';
  });

  // Clean any remaining unreplaced {{variable}}
  subject = subject.replace(/{{\s*[\w.]+\s*}}/g, '');
  body = body.replace(/{{\s*[\w.]+\s*}}/g, '');

  return { subject, body };
}

/**
 * 2. Get template by matching event type
 */
export function getTemplateByEvent(eventType) {
  const list = getStoredTemplates();
  return list.find((t) => t.eventType === eventType && t.active) || list[0];
}

/**
 * 3. Preview a template with sample or custom data
 */
export function previewTemplate(template, customData = {}) {
  return renderTemplate(template, { ...DEMO_PREVIEW_DATA, ...customData });
}

/**
 * 4. Get all templates
 */
export function getAllTemplates() {
  return getStoredTemplates();
}

/**
 * 5. Save or update a template
 */
export function saveTemplate(template) {
  const list = getStoredTemplates();
  const existingIndex = list.findIndex((t) => t.id === template.id);

  if (existingIndex >= 0) {
    list[existingIndex] = { ...list[existingIndex], ...template, updatedAt: new Date().toISOString() };
  } else {
    list.unshift({
      ...template,
      id: template.id || `TPL-CUSTOM-${Date.now()}`,
      isSystem: false,
      active: true,
      createdAt: new Date().toISOString()
    });
  }

  saveStoredTemplates(list);
  return template;
}

/**
 * 6. Duplicate an existing template
 */
export function duplicateTemplate(templateId) {
  const list = getStoredTemplates();
  const orig = list.find((t) => t.id === templateId);
  if (!orig) return null;

  const clone = {
    ...orig,
    id: `TPL-COPY-${Date.now()}`,
    name: `${orig.name} (Copy)`,
    isSystem: false,
    active: true,
    createdAt: new Date().toISOString()
  };

  list.push(clone);
  saveStoredTemplates(list);
  return clone;
}

/**
 * 7. Restore a template to its default content
 */
export function restoreDefaultTemplate(templateId) {
  const defaultVersion = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
  if (!defaultVersion) return null;

  const list = getStoredTemplates();
  const index = list.findIndex((t) => t.id === templateId);

  if (index >= 0) {
    list[index] = { ...defaultVersion };
    saveStoredTemplates(list);
    return list[index];
  }
  return null;
}

export default {
  renderTemplate,
  getTemplateByEvent,
  previewTemplate,
  getAllTemplates,
  saveTemplate,
  duplicateTemplate,
  restoreDefaultTemplate
};
