export type TSectoinHeaderProps = {
  title: string;
  path: string;
}
interface BaseCardProps {
  image: string;
  title: string;
  rating: number;
  location: string;
  isFavorite: boolean;
}
export interface RecommendationCardProps extends BaseCardProps {
  variant: 'recommendation';
}
export interface TourCardProps extends BaseCardProps {
  variant: 'tour';
  price: number;
  tourType: string
}


export type Tour = {
  id: number;
  title: string;
  slug: string;
  type: string;
  location: string;
  duration: number;
  visit_season: string;
  image: string;
  rating_average: number;
  reviews_count: number;
  is_favourite: boolean
};


export type RecommendationTourResponse = {
  data: Tour[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; page: number | null; active: boolean }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  status: string;
  message: string;
};
