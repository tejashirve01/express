const express = require("express");
const z = require("zod")

const mySchema = z.string();

console.log(mySchema.parse("Tejas"))

console.log(mySchema.safeParse("Tejas"));