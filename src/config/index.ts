import { DataConfig } from "@/types";
import {
  DaMaiConfig,
  DinhKeConfig,
  DinhTriConfig,
  DongSonConfig,
  HoangVanThuConfig,
  SongKheConfig,
  SongMaiConfig,
  TanMyConfig,
  TanTienConfig,
  ThoXuongConfig,
} from "./data";

export const DEFAULT_ELEMENTRY = TanTienConfig;

export const ELEMENTRY_LIST: DataConfig[] = [
  SongKheConfig,
  DinhTriConfig,
  DongSonConfig,
  DaMaiConfig,
  SongMaiConfig,
  HoangVanThuConfig,
  TanTienConfig,
  TanMyConfig,
  DinhKeConfig,
  ThoXuongConfig,
];
