import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { reviews, ratingDistribution, hotelInfo } from '../data/mockData';
import { Avatar, AvatarFallback } from './ui/avatar';

const ReviewsSection = ({ language }) => {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {language === 'en' ? 'Guest Reviews' : 'അതിഥി അവലോകനങ്ങൾ'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'What our guests say about their experience'
              : 'അതിഥികൾ അവരുടെ അനുഭവത്തെക്കുറിച്ച് പറയുന്നത്'}
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overall Rating Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0 h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2">{hotelInfo.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(hotelInfo.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-white/30 text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-white/90">
                      {language === 'en' ? 'Based on' : 'അടിസ്ഥാനമാക്കി'} {hotelInfo.totalReviews}{' '}
                      {language === 'en' ? 'reviews' : 'അവലോകനങ്ങൾ'}
                    </p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-3">
                    {ratingDistribution.map((rating) => (
                      <div key={rating.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm font-semibold">{rating.stars}</span>
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${rating.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">{rating.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Review Cards */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                        <AvatarFallback className="bg-transparent text-white font-bold">
                          {review.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-slate-900">{review.name}</h4>
                            <p className="text-sm text-slate-500">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="relative">
                          <Quote className="absolute -top-1 -left-1 h-8 w-8 text-teal-100" />
                          <p className="text-slate-700 leading-relaxed pl-6">{review.comment[language]}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center pt-4">
                <a
                  href={`https://www.google.com/search?q=HR+Residency+Kozhikode+reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  {language === 'en' ? 'Read all reviews on Google' : 'ഗൂഗിളിൽ എല്ലാ അവലോകനങ്ങളും വായിക്കുക'}
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
