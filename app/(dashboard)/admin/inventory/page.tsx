"use client";
import useSWR from "swr";
import { IngredientType, InventoryType } from "@/types/types";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
} from "@nextui-org/react";

// const getInventoryData = async () => {
//     const res = await fetch("http://localhost:3000/api/inventory", {
//         // change later
//         cache: "no-store",
//     });
//     if (!res.ok) {
//         throw new Error("failed sadge");
//     }
//     return res.json();
// };

const InventoryPage = () => {
    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onClose: onClose1,
        onOpenChange: onOpenChange1,
    } = useDisclosure();
    const {
        isOpen: isOpen2,
        onOpen: onOpen2,
        onClose: onClose2,
        onOpenChange: onOpenChange2,
    } = useDisclosure();

    const fetcher = (url: string): Promise<IngredientType[]> =>
        fetch(url).then((res) => res.json());
    const {
        data: fetchedIngredients,
        mutate,
        error,
    } = useSWR("http://localhost:3000/api/ingredient", fetcher);
    const ingredients = fetchedIngredients
        ? [...fetchedIngredients].sort((a, b) => a.name.localeCompare(b.name))
        : null;

    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState(0);
    const [currentID, setCurrentID] = useState("");
    const [restockAmount, setRestockAmount] = useState(0);

    if (!ingredients) {
        return (
            <div className="h-screen flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center p-4">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            </div>
        );
    }

    async function handleDelete(id: string) {
        console.log(currentID);
        const res = await fetch(`http://localhost:3000/api/ingredient/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            toast.success("ingredient deleted");
        } else {
            toast.error("could not delete ingredient");
        }
        mutate();
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof ingredient !== "string" || ingredient.trim() === "") {
            return;
        }
        if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
            return;
        }
        if (ingredients) {
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredient === ingredients[i].name) {
                    toast.error("Can't add duplicate ingredient");
                    return;
                }
            }
        }

        try {
            const res = await fetch("http://localhost:3000/api/ingredient", {
                method: "POST",
                body: JSON.stringify({
                    name: ingredient,
                    amount: amount,
                }),
            });
            const data = await res.json();
            mutate();
            toast.success("new ingredient added");
        } catch (err) {
            toast.error("Something went wrong when submiting a new ingredient");
        }
        onClose1();
    }

    async function handleRestock(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (
            typeof restockAmount !== "number" ||
            isNaN(restockAmount) ||
            restockAmount < 0
        ) {
            return;
        }
        console.log(
            "Sending request body:",
            JSON.stringify({ restockAmount, id: currentID })
        );

        try {
            const res = await fetch(`http://localhost:3000/api/ingredient`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ restockAmount, id: currentID }), // Include id here
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Ingredient restocked");
                mutate();
            } else {
                // toast.error(data.message);
                console.log("Error response body:", data);
            }
        } catch (error) {
            toast.error("Something went wrong when restocking");
        }
        onClose2();
    }

    return (
        <div>
            {" "}
            <Modal
                isOpen={isOpen2}
                onOpenChange={onOpenChange2}
                placement="top-center"
                size="xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <form
                            onSubmit={(e) => {
                                handleRestock(e);
                            }}
                        >
                            <ModalHeader className="flex flex-col gap-1">
                                Restock
                                {currentID}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    type="number"
                                    min={0}
                                    label="Amount"
                                    placeholder="enter amount"
                                    labelPlacement="outside"
                                    onChange={(e) =>
                                        setRestockAmount(Number(e.target.value))
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="default"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button type="submit" color="success">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpen1}
                onOpenChange={onOpenChange1}
                placement="top-center"
                size="xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">
                                Add new Ingredient
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    onChange={(e) =>
                                        setIngredient(e.target.value)
                                    }
                                    label="Name"
                                    placeholder="Enter name of the ingredient"
                                    variant="bordered"
                                    type="text"
                                />
                                <Input
                                    isRequired
                                    type="number"
                                    min={0}
                                    label="Amount"
                                    placeholder="enter amount"
                                    labelPlacement="outside"
                                    onChange={(e) =>
                                        setAmount(Number(e.target.value))
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="default"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    color="success"
                                    // onPress={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <div className="m-10 ">
                <h1 className="text-4xl my-10 text-center">
                    Ingredient Inventory
                </h1>
                <div className="overflow-x-autol">
                    <table className="table border-4 rounded-xl">
                        {/* head */}
                        <thead>
                            <tr className="text-2xl text-center">
                                <th></th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Add Amount</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((item, idx) => (
                                <tr
                                    className="text-xl text-center"
                                    key={item.id}
                                >
                                    <th>{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <button
                                            data-theme="garden"
                                            className="btn btn-sm"
                                            onClick={() => {
                                                setCurrentID(item.id);
                                                onOpen2();
                                            }}
                                        >
                                            restock
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            data-theme="garden"
                                            className="btn btn-sm btn-error"
                                            onClick={() => {
                                                setCurrentID(item.id);
                                                handleDelete(item.id);
                                            }}
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 flex gap-3">
                    <Link href="/">
                        <button data-theme="aqua" className="btn btn-neutral">
                            Home
                        </button>
                    </Link>
                    <Link href="/admin">
                        <button data-theme="aqua" className="btn btn-primary">
                            Dashboard
                        </button>
                    </Link>

                    <button
                        data-theme="garden"
                        className="btn btn-accent"
                        onClick={onOpen1}
                    >
                        Add new ingreident
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
