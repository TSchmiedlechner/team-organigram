export interface ITeamMember {
    name: string,
    role: string,
    email?: string,
    imageUrl?: string,
    isTeamOwner?: boolean,
    isProductOwner?: boolean
}