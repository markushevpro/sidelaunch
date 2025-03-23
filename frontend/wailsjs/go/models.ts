export namespace frontend {
	
	export class FileFilter {
	    DisplayName: string;
	    Pattern: string;
	
	    static createFrom(source: any = {}) {
	        return new FileFilter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.DisplayName = source["DisplayName"];
	        this.Pattern = source["Pattern"];
	    }
	}

}

export namespace main {
	
	export class PageData {
	    page: string;
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new PageData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.page = source["page"];
	        this.id = source["id"];
	    }
	}
	export class UrlData {
	    dir: string;
	    url: string;
	    icon: string;
	
	    static createFrom(source: any = {}) {
	        return new UrlData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dir = source["dir"];
	        this.url = source["url"];
	        this.icon = source["icon"];
	    }
	}

}

