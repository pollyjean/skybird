export interface AccountFormValues {
  email: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
  avatar?: FileList;
}

export interface TweetFormValues {
  id?: number;
  text?: string;
  image?: FileList;
  likes?: number;
  userId?: string;
}

export interface FetchResults {
  ok?: boolean;
  tweetId?: number;
  likes?: number;
  message?: {
    type: "email" | "username" | "password" | "passwordConfirm" | "avatar";
    value: string;
  };
  error?: any;
}

export interface PageProps {
  userId?: number;
  tweetId?: number;
}

export const TAIL = {
  form: "flex flex-col gap-4 rounded-md border border-base-300 p-4",
  groupInput: "relative flex flex-col gap-1",
  label: "text-sm font-medium text-base-800",
  textInput:
    "rounded-md border border-base-200 bg-base-250 p-3 text-sm placeholder:opacity-40",
  formError: "absolute right-0 top-0 h-5 text-xs text-red",
  button:
    "mt-2 rounded-md bg-blue-light border-2 border-blue p-2 font-medium text-base-50 hover:bg-blue",
  textLink: "hover:underline hover:underline-offset-2",
  pageTitle: "text-4xl font-medium text-base-400 uppercase tracking-tight mt-6",
} as const;

export const PATTERN = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

export const PLACEHOLDER = {
  email: "ex) youremail@domain.com",
  three: "At least 3 characters",
  passwordAgain: "Enter your password again",
} as const;

export const REQUIRED = {
  email: "Email is required",
  password: "Password is required",
  passwordAgain: "Enter Password Again",
} as const;

export const MESSAGE = {
  three: "Enter at least 3 characters",
  email: "Please enter as an email",
} as const;
