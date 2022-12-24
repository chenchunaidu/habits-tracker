import { redirect } from "@remix-run/node";
import type { User } from "@supabase/supabase-js";
import type { ApiError } from "@supabase/supabase-js";
import { createUser } from "~/models/user.server";
import { supabase } from "../supabase/supabase.server";
import supabaseToken from "./cookie";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SigninData {
  email: string;
  password: string;
}

interface CreateNewUserOutput {
  error?: ApiError | null;
  data?: User | null;
}

export const createNewUser = async (
  data: SignupData
): Promise<CreateNewUserOutput> => {
  const userData = await supabase.auth.signUp({
    email: data?.email,
    password: data?.password,
  });
  const { user, error } = userData;
  if (user) {
    try {
      const createdUser = await createUser({
        id: user?.id,
        verified: true,
        name: data?.name,
        avatar: "",
        email: data?.email,
      });
    } catch (error) {
      console.log(error);
      throw Error("Request failed");
    }
    return { data: user, error };
  }
  return { error };
};

export const signInUser = async ({ email, password }: SigninData) => {
  const { error, ...data } = await supabase.auth.signIn({
    email,
    password,
  });
  return { data, error };
};

const getToken = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  return await supabaseToken.parse(cookieHeader);
};

const getUserByToken = async (token: string) => {
  supabase.auth.setAuth(token);
  const { user, error } = await supabase.auth.api.getUser(token);
  return { user, error };
};

export const isAuthenticated = async (
  request: Request,
  validateAndReturnUser = false
) => {
  const token = await getToken(request);
  if (!token && !validateAndReturnUser) return false;
  if (validateAndReturnUser) {
    const { user, error } = await getUserByToken(token);
    if (error) {
      return false;
    }
    return { user };
  }
  return true;
};

export const requiredUser = async (request: Request): Promise<User> => {
  const userAuthenticated = await isAuthenticated(request, true);
  if (
    !userAuthenticated ||
    typeof userAuthenticated === "boolean" ||
    !userAuthenticated.user
  ) {
    throw redirect("/login");
  }
  return userAuthenticated.user;
};

export async function logout(request: Request) {
  console.log("coming");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await supabaseToken.serialize("sd"),
    },
  });
}
