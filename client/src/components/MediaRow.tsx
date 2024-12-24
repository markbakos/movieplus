import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";

interface MediaItem {
    id: number
    title: string
    poster_path: string
}

interface MediaRowProps {
    title: string
    items: MediaItem[]
}

export const MediaRow: React.FC<MediaRowProps> = ({ title, items }) => {
    return (
        <div className="mb-8 p-4 overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex space-x-4 overflow-y-hidden">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="overflow-hidden w-max rounded-lg shadow-lg">
                                <Link to={`/browse/${item.id}`}><img
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={item.title}
                                    className="h-64 w-44 object-cover rounded-lg shadow-md select-none cursor-pointer"
                                    draggable="false"
                                /></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <ScrollBar className="bg-white/80 active:bg-indigo-700" orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

