import {describe,it,expect} from 'vitest';
import {assertOrganizerPrincipal,buildImportedSnapshot,sourceCapabilities,organizerPolicySchema,organizerImportSchema} from '../packages/server/organizer';
import {EVENTS} from '../packages/sports/src/index';
import {generateSnapshot,LOCAL_TEST_SEED} from '../packages/fixtures/src/generate';
describe('organizer source authority',()=>{
 it('rejects buyer role switch and foreign organizer even for operators',()=>{const e=EVENTS[0]!;expect(()=>assertOrganizerPrincipal({id:'a',tenantId:e.organizerId,role:'buyer'},e)).toThrow();expect(()=>assertOrganizerPrincipal({id:'a',tenantId:'foreign',role:'operator'},e)).toThrow();expect(()=>assertOrganizerPrincipal({id:'a',tenantId:e.organizerId,role:'seller'},e)).not.toThrow()});
 it('validates rows and preserves original frozen snapshot',()=>{const e=EVENTS[0]!,s=generateSnapshot(e.id,LOCAL_TEST_SEED),original=JSON.stringify(s);const result=buildImportedSnapshot(e,s,'observations',[]);expect(result.snapshot.observations).toEqual([]);expect(JSON.stringify(s)).toBe(original);expect(result.diagnostics.availableTemplates).not.toContain('ticket_usage_v1')});
 it('rejects broken references and cross-tenant snapshot',()=>{const e=EVENTS[0]!,s=generateSnapshot(e.id,LOCAL_TEST_SEED);expect(()=>buildImportedSnapshot(e,s,'accounts',[])).toThrow();expect(()=>buildImportedSnapshot(e,{...s,organizerId:'foreign'},'observations',[])).toThrow()});
 it('running imports never become spectator-admission capabilities',()=>{const e=EVENTS[8]!,s=generateSnapshot(e.id,LOCAL_TEST_SEED);expect(sourceCapabilities(e,s)).toContain('entries');expect(sourceCapabilities(e,s)).not.toContain('entitlements');expect(()=>buildImportedSnapshot(e,s,'entitlements',[])).toThrow()});
 it('strict policy rejects excess test price, raw SQL and arbitrary code',()=>{expect(()=>organizerPolicySchema.parse({eventId:'x',allowedTemplates:['ticket_usage_v1'],maxPriceWei:'9999999999999999',enabled:true})).toThrow();expect(()=>organizerImportSchema.parse({eventId:'x',table:'accounts',csv:'id',sql:'select *'})).toThrow()});
});
