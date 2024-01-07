import conf from "../Config/Config";

import { Client , Account ,ID } from "appwrite"


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }
    // function to create an account 
    async createAccount({email,password,name}){
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name)
           if(userAccount){
            // call another method
            return this.login({email,password})
           }
           else{
            return userAccount;
           }
           
        } catch (error) {
            throw error;
        }
    }
    async login( {email,password} ){
        try {
           return await this.account.createEmailSession(email,password);

        } catch (error) {
            return error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite service :: getcurrentUser :: error ",error);
        }
        return null;
    }
    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }

}
const authService = new AuthService();

export default authService