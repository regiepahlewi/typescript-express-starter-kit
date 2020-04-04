export interface IRequest {

}

export interface IRequestValidator {
    name?: string;
    validation?: 'required' | 'min' | 'max' | 'regex'
    regex?: RegExp;
}