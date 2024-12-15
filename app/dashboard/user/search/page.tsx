"use client";

import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircleIcon } from "lucide-react";

const SearchPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get("query") || "");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, filter]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/search?query=${searchQuery}&filter=${filter}`);
      setResults(res?.data?.data); // Assuming API response is { success: boolean, message: string, data: any[] }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target?.value)}
          placeholder="Search for recipes or profiles"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="recipes">Recipes</SelectItem>
            <SelectItem value="profiles">Profiles</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full md:w-auto">
          {loading ? <LoaderCircleIcon className="animate-spin" /> : "Search"}
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results?.length === 0 ? (
          <p>No results found</p>
        ) : (
          results?.map((result: any) => (
            <Card key={result?.id}>
              <CardHeader>
                <CardTitle>{result?.title || result?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{result?.description || result?.bio}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;