import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useCart();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    location: '',
    productName: 'Monolith 480 GSM Heavy Hoodie',
    rating: 5,
    fitFeedback: 'Fits True to Size',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const reviewToAdd = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      location: newReview.location || 'Verified Buyer',
      productName: newReview.productName,
      rating: newReview.rating,
      date: 'Just now',
      verified: true,
      fitFeedback: newReview.fitFeedback,
      comment: newReview.comment
    };

    setReviewsList([reviewToAdd, ...reviewsList]);
    setShowForm(false);
    setNewReview({
      author: '',
      location: '',
      productName: 'Monolith 480 GSM Heavy Hoodie',
      rating: 5,
      fitFeedback: 'Fits True to Size',
      comment: ''
    });
    showToast('Thank you! Your verified garment review has been published.');
  };

  return (
    <section id="reviews" className="py-24 bg-[#0a0b0d] border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-850 pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Community Dossier
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display mt-2">
              Verified Client Impressions
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right font-mono text-xs hidden sm:block">
              <div className="text-white font-bold text-sm tabular-nums">4.94 / 5.0 RATING</div>
              <div className="text-stone-400">Based on 145 verified orders</div>
            </div>

            <button
              onClick={() => setShowForm(prev => !prev)}
              className="px-4 py-2.5 bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Impression</span>
            </button>
          </div>
        </div>

        {/* Add Review Drawer/Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 bg-[#121316] border border-stone-700 space-y-4 max-w-2xl mx-auto animate-in fade-in duration-150">
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-white">
              Submit Garment Impression
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Evans"
                  value={newReview.author}
                  onChange={e => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">City, Country</label>
                <input
                  type="text"
                  placeholder="e.g. Berlin, Germany"
                  value={newReview.location}
                  onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Garment Piece</label>
                <select
                  value={newReview.productName}
                  onChange={e => setNewReview({ ...newReview, productName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                >
                  <option value="Monolith 480 GSM Heavy Hoodie">Monolith 480 GSM Heavy Hoodie</option>
                  <option value="Tactical Selvedge Wool Overshirt">Tactical Selvedge Wool Overshirt</option>
                  <option value="Pleated Wide-Leg Basalt Trousers">Pleated Wide-Leg Basalt Trousers</option>
                  <option value="Form 04 Heavyweight Raw Tee">Form 04 Heavyweight Raw Tee</option>
                  <option value="Architectural Modular Fishtail Parka">Architectural Modular Fishtail Parka</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Fit Assessment</label>
                <select
                  value={newReview.fitFeedback}
                  onChange={e => setNewReview({ ...newReview, fitFeedback: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                >
                  <option value="Fits True to Size (Boxy)">Fits True to Size (Boxy)</option>
                  <option value="Runs Slightly Oversized">Runs Slightly Oversized</option>
                  <option value="Tailored Architectural Fit">Tailored Architectural Fit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Your Impression & Feedback *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe fabric hand-feel, silhouette posture, and washing longevity..."
                value={newReview.comment}
                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-mono text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white text-stone-950 font-bold text-xs uppercase font-mono tracking-wider hover:bg-stone-200"
              >
                Publish Impression
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map(rev => (
            <div
              key={rev.id}
              className="p-6 bg-[#111214] border border-stone-850 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars and Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Verified Client</span>
                  </div>
                </div>

                {/* Garment Title and Fit */}
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white font-mono">{rev.productName}</div>
                  <div className="text-[11px] text-stone-400 font-mono">{rev.fitFeedback}</div>
                </div>

                {/* Comment Body */}
                <p className="text-xs text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author and Date Attribution */}
              <div className="pt-3 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400 font-mono">
                <span className="font-medium text-stone-200">{rev.author}</span>
                <span>{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
