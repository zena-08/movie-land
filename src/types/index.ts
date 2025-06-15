export interface MovieType {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    isStarred?: boolean;
    watchLater?: boolean;
}