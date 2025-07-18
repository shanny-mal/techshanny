import { useTransform } from "framer-motion";

export default function useParallax(scrollY, from, to, outFrom, outTo) {
  return useTransform(scrollY, [from, to], [outFrom, outTo]);
}
