export interface HierarchyNode<T = any> {
    title: string
    name: string
    children: HierarchyNode<T>[]
    info?: string
    skills?: string[]
    url?: string
    ac?: { acCode: string; acName: string; acJustification: string }[]
    competences?: string[]
}

export interface Hierarchy<T = any> {
    pro: HierarchyNode<T>
}
