import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { offerService } from '../services/offerService';
import OfferPreview from '../components/offers/OfferPreview';

export default function OfferPreviewPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const allOffers = offerService.getOffers();
  const offer = allOffers.find(o => o.id === offerId) || allOffers[0];

  return (
    <div className="min-h-screen bg-slate-900/80 flex items-center justify-center p-4">
      <OfferPreview
        offer={offer}
        onClose={() => navigate(-1)}
      />
    </div>
  );
}
