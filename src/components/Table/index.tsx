"use client";
import React, { useEffect, useState, Suspense } from "react";
import searchBooks from "@/hooks/searchBooks";
import { Result, Spin, Rate, Table, Tag, Button } from "antd";
import type { TableProps, GetProp } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import csvDownload from "json-to-csv-export";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  key: string;
  title: string;
  author_name: string | string[];
  first_publish_year: number;
  subject: string;
  ratings_average: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

function Tables({ author, setAuthor }: { author: any; setAuthor: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("Theory of Everything");
  const [features, setFeature] = useState<string>("title");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: currentPage,
      pageSize: pageSize,
      total: 10000,
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      sorter: {
        compare: (a, b) => Number(a.key) - Number(b.key),
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author Name",
      dataIndex: "author_name",
      key: "author_name",
      render: (author_name: string | string[]) => {
        if (typeof author_name === 'string') {
          author_name = [author_name];
        }
        
        if (!author_name || author_name.length === 0) return null;
        
        let res = Array.from(author_name[0]?.toString().split(","));
        return res?.map((name: any, idx) => (
          <p
            className="cursor-pointer hover:underline"
            onClick={() =>
              setAuthor({ author: name, authorId: author_name[1]?.[idx] })
            }
            key={idx}
          >
            {name}
          </p>
        ));
      },
    },
    {
      title: "First Publish Year",
      key: "first_publish_year",
      dataIndex: "first_publish_year",
      width: "12%",
      sorter: {
        compare: (a, b) => a.first_publish_year - b.first_publish_year,
      },
    },
    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
      width: "30%",
      render: (subject: string) => {
        let res = Array.from(subject?.toString().split(","));
        return res?.map((el: string, idx) => (
          <Tag color="blue" key={idx}>
            {el}
          </Tag>
        ));
      },
    },
    {
      title: "Ratings Average",
      sorter: {
        compare: (a, b) => a.ratings_average - b.ratings_average,
      },
      key: "ratings_average",
      dataIndex: "ratings_average",
      width: "15%",
      render: (rating) => (
        <>
          <Rate allowHalf defaultValue={rating} />
        </>
      ),
    },
  ];

  const { data, mutate, isLoading } = searchBooks(
    searchQuery,
    currentPage,
    pageSize,
    features
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "Theory of Everything");
    setFeature(searchParams.get("feature") || "title");
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
    setPageSize(parseInt(searchParams.get("limit") || "10", 10));
  }, [searchParams]);

  useEffect(() => {
    mutate(data);
  }, [data, mutate]);

  const resp: Array<DataType> = data?.docs.map((book: any, index: number) => ({
    key: Number((currentPage - 1) * pageSize + index + 1),
    title: book.title || "N/A",
    author_name: book.author_name ? [book.author_name, book.author_key] : ["N/A"],
    first_publish_year: book.first_publish_year || "N/A",
    subject: book.subject || "N/A",
    ratings_average: book.ratings_average || 0,
  }));

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    router.push(
      `/?search=${searchQuery}&page=${pagination.current}&limit=${pagination.pageSize}&feature=${features}`
    );
  };

  return (
    <div className="w-full h-full flex justify-center">
      <Suspense fallback={<Spin className="mt-20" />}>
        {isLoading ? (
          <Spin className="mt-20" />
        ) : resp.length > 0 ? (
          <>
            <Table
              columns={columns}
              dataSource={resp}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
              showSorterTooltip={true}
            />

            {resp && (
              <Button
                type="default"
                onClick={() => csvDownload({ data: resp, filename: "book" })}
                className="absolute right-4 bottom-[5px] font-semibold"
              >
                Download CSV
              </Button>
            )}
          </>
        ) : (
          <Result
            status="404"
            className="mt-20"
            title="No results found"
            subTitle="Sorry, we couldn't find any results for your search."
          />
        )}
      </Suspense>
    </div>
  );
}

export default Tables;
