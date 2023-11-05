"use client";
import { IngredientType, RecipeType } from "@/types/types";
import React, { useState } from "react";
import useSWR from "swr";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Textarea,
} from "@nextui-org/react";

const RecipePage = () => {
    const handleSubmit = () => {};
    return (
        <div className="">
            <div className="flex justify-center flex-col items-center gap-5 mt-24">
                <h1 className=" my-8 text-4xl">Add a new recipe for drink</h1>
                <div className="flex w-1/2 justify-center items-center">
                    <div className="w-1/2 gap-4 flex flex-col">
                        <Input
                            label="name"
                            type="name"
                            placeholder="Enter recipe name"
                            variant="flat"
                            size="lg"
                        />
                        <Textarea
                            label="Description"
                            labelPlacement="inside"
                            placeholder="Enter your description"
                            size="lg"
                        />
                        <div className="flex gap-4">
                            <Button>Add new ingredient</Button>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
