export interface HttpResponse<T> {
    code: string;
    data?: T;
    message: string;
}