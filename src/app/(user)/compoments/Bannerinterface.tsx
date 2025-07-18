"use client";
import React, { useState, useEffect } from "react";
export default interface Bannerinterface {
  id: number;
  link_banner: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
