module App.models {
    export interface IGenericValue<T> {
        Data: T[];
        PagedData: T[];
        Count: number;
        PageCount: number;
        ItemsPerPage?: number;
    }

    export class GenericValue<T> implements IGenericValue<T>{
        public Count: number;
        public PageCount: number;
        public PagedData: T[];

        constructor(public Data: T[], public ItemsPerPage?: number) {
            this.Data = this.Data || [];
            this.Count = this.Data.length || 0;
            this.ItemsPerPage = this.ItemsPerPage || this.Count;
            this.PageCount = Math.round(this.Count / this.ItemsPerPage);
            this.PagedData = this.Data.slice(0, this.ItemsPerPage);
        }
    }
}