import { useMutation, useQuery } from "@tanstack/react-query";
import { instance, type SignInRequest } from "@/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

const router = "/user";
const cookie = new Cookies();

export const useSignIn = (data: SignInRequest) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => axios.post(`${import.meta.env.VITE_BASE_URL}${router}/login`, data),
    onSuccess: res => {
      cookie.set("access_token", res.data.token);
      toast.success("로그인에 성공하였어요.");
      navigate("/");
    },
    onError: () => {
      toast.error("로그인에 실패했어요.");
    },
  });
};

// 내 코인 잔액 조회
export const useMyCoin = () => {
  return useQuery({
    queryKey: ["myCoin"],
    queryFn: async () => await instance.get<{ coin: number }>(`${router}/coin`),
  });
};
