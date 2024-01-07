import conf from "../Config/Config";
import {Client , ID , Databases, Storage,Query, Account} from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket  = new Storage(this.client)
    }


    async createPost({tittle,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDBId,
                conf.appwriteCollectionId,
                slug
            ),
            {
                tittle,
                content,
                featuredImage,
                status,
                userId
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug,{tittle,content,featuredImage,status}){
        try {
        return await this.databases.updateDocument(
            conf.appwriteDBId,
            conf.appwriteCollectionId,
            slug,
            {
                tittle,
                content,
                featuredImage,
                status
            }
        )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDBId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDBId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);
        }
    }
}
const service = new Service()
export default service