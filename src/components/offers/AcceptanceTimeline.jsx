import React from 'react';
import { Send, Eye, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function AcceptanceTimeline({ offer }) {
  if (!offer) return null;

  const isAccepted = offer.status === 'Accepted' || offer.acceptance?.status === 'Accepted';
  const isDeclined = offer.status === 'Declined' || offer.acceptance?.status === 'Declined';
  const isSent = offer.status === 'Sent' || offer.status === 'Viewed' || isAccepted || isDeclined;
  const isViewed = offer.status === 'Viewed' || isAccepted || isDeclined;

  const steps = [
    {
      title: 'Offer Sent',
      desc: offer.offerDate ? `${offer.offerDate}, 10:30 AM` : '15 Oct, 10:30 AM',
      icon: Send,
      completed: isSent
    },
    {
      title: 'Offer Viewed',
      desc: isViewed ? '15 Oct, 11:12 AM' : 'Pending candidate view',
      icon: Eye,
      completed: isViewed
    },
    {
      title: isAccepted ? 'Offer Accepted' : isDeclined ? 'Offer Declined' : 'Decision Pending',
      desc: isAccepted
        ? offer.acceptance?.acceptedAt
          ? new Date(offer.acceptance.acceptedAt).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : '15 Oct, 1:45 PM'
        : isDeclined
        ? offer.acceptance?.declinedAt
          ? new Date(offer.acceptance.declinedAt).toLocaleDateString()
          : 'Declined'
        : `Expires ${offer.expiryDate || '25 Oct 2026'}`,
      icon: isAccepted ? CheckCircle2 : isDeclined ? XCircle : Clock,
      completed: isAccepted || isDeclined,
      isDanger: isDeclined,
      isSuccess: isAccepted
    }
  ];

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1.5px solid #E2E8F0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#101B36', margin: 0 }}>
          Acceptance & Decision Timeline
        </h4>
        {!isAccepted && !isDeclined && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              padding: '2px 8px',
              borderRadius: '6px'
            }}
          >
            ⏳ Active Window
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: s.isSuccess
                    ? '#10B981'
                    : s.isDanger
                    ? '#EF4444'
                    : s.completed
                    ? '#3978F6'
                    : '#E2E8F0',
                  color: s.completed || s.isSuccess || s.isDanger ? '#FFFFFF' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  zIndex: 2
                }}
              >
                <Icon size={16} />
              </div>

              <div style={{ fontSize: '13px', fontWeight: 700, color: '#101B36' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
