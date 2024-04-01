export {default } from "next-auth/middleware"

export const config = {
    matcher : [
        "/issues/new",   //add issue
        "/issues/edit/:id+"  //edit issue
    ]
}