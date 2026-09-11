/** Append-only code-owned extension registry. Tenant uploads cannot register executable packs. */
export interface PackVersion {id:string;version:string;formats:readonly string[];templates:readonly string[];nativeView:string}
export class VersionedPackRegistry {
 private readonly versions=new Map<string,Readonly<PackVersion>>();
 register(pack:PackVersion){if(!/^[a-z][a-z0-9_]*$/.test(pack.id)||!/^\d+$/.test(pack.version)||!pack.formats.length||!pack.templates.length||!pack.nativeView)throw new Error('Incomplete reviewed pack');const key=pack.id+'@'+pack.version;if(this.versions.has(key))throw new Error('Historical pack versions are immutable');this.versions.set(key,Object.freeze({...pack,formats:Object.freeze([...pack.formats]),templates:Object.freeze([...pack.templates])}));}
 resolve(id:string,version:string){const pack=this.versions.get(id+'@'+version);if(!pack)throw new Error('Unregistered pack version');return pack;}
}
