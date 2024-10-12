import { UnitAlias, Member, Unit } from './entities';

//函数的功能是根据Member[] UnitName字段的值去 UnitAlias[] 查询对应的UnitCode字段的值，然后将UnitCode字段的值赋值给Member[] UnitCode字段
//函数的名称为fillUnitCode
//函数的输入参数为members: Member[], UnitAlias: UnitAlias[]
//函数的返回值为Member[]，返回填充好UnitCode字段的Member[]，如果UnitName字段在UnitAlias[]中没有找到对应的UnitCode字段，则UnitCode字段的值为"
//注意：不要改变输入参数的值
//提示：可以使用map函数
export function fillUnitCode(members: Member[], UnitAlias: UnitAlias[]): Member[] {
    const unitMap = new Map(UnitAlias.map(ua => [ua.AliasName, ua.UnitCode]));
    return members.map(member => ({
        ...member,
        UnitCode: unitMap.get(member.UnitName) || ""
    }));
}


//函数的功能:根据UnitCode字段去Unit[]中查询对应的FullUnitName字段的值
//函数的名称为fillFullUnitName
//函数的输入参数为members: Member[], units: Unit[]
//函数的返回值为Member[]，返回填充好FullUnitName字段的Member[]，如果UnitCode字段在Unit[]中没有找到对应的FullUnitName字段，则FullUnitName字段的值为""
//注意：不要改变输入参数的值
//提示：可以使用map函数
export function fillFullUnitName(members: Member[], units: Unit[]): Member[] {
    const unitMap = new Map(units.map(unit => [unit.UnitCode, unit.FullUnitName]));
    return members.map(member => ({
        ...member,
        FullUnitName: unitMap.get(member.UnitCode) || ""
    }));
}


//函数功能为对输入的Member[]进行检查，如果存在UnitCode为空的情况，返回一段字符串信息，明确说明哪些Member数据有误，标注好Member的UnitName
//如果没有问题，返回空字符串
//函数名称为checkMembers
export function checkMembers(members: Member[]): string {
    const invalidMembers = members.filter(member => !member.UnitCode);
    if (invalidMembers.length === 0) {
        return "";
    }
    return invalidMembers.map(member => `单位名称： ${member.UnitName} 无法找到对应的部门代码.`).join("\n");
}