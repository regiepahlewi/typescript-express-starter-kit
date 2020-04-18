export interface IRequestValidator {
    name?: string;
    validation?: 'required' | 'min' | 'max' | 'regex'
    regex?: string;
    value?: any;
}