export type ValidationError = {
    message: string
};

export type ErrorType = {
   message: string | undefined
}

export type ImageType = {
    title: string,
    author_name: string,
    createdAt: string,
    gallery_image: string,
    _id: string
};

export type UserType = {
    name: string,
    email: string,
    profile_photo: string,
    _id: string,
    password: string
};

export type GroupType = {
    name: string,
    description: string,
    profile_photo: string | File,
    _id: string
};

export type MemberType = {
    name: string,
    children: string[],
    dates: string,
    info: string,
    level: number,
    parents: string[],
    partner: string,
    siblings: string[],
    photo: string | File,
    _id?: string
}

export type PostType = {
    author_id: string,
    author_name: string,
    text: string,
    group_id: string,
    _id: string,
    createdAt: string
}