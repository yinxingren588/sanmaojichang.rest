export function addCandidate(current: string[], id: string, allowed: string[]) {
  if (!allowed.includes(id)) return { ids: current, message: '请选择有效品牌。' };
  if (current.includes(id)) return { ids: current, message: '该品牌已在候选中。' };
  if (current.length>=4) return { ids: current, message: '最多比较 4 家，请先移除一个候选。' };
  return { ids:[...current,id], message:'' };
}
export function removeCandidate(current:string[],id:string){return current.filter(x=>x!==id);}
