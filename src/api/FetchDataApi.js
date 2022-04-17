/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fruitApi = createApi({
  reducerPath: "fruitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3010/" }),
  refetchOnFocus: true,
  // refetchOnMountOrArgChange: true,
  tagTypes: ["Fruits"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => `getAll`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              //add each fruit tag to the cache
              ...result.map(({ id }) => ({ type: "Fruits", id })),
              //add list tag to the cache
              { type: "Fruits", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Fruits", id: "LIST" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //not supported yet
          data.map((fruit) => {
            dispatch(
              fruitApi.util.updateQueryData("getById", fruit.id, (draft) => {
                console.log("hi mom");
                return Object.assign(draft, fruit);
              })
            );
          });
        } catch (e) {
          console.log(e);
        }
      },
    }),
    getByPage: builder.query({
      query: ({ page, perPage }) => `getByPage?page=${page}&perPage=${perPage}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              //add each fruit tag to the cache
              ...result.map(({ id }) => ({ type: "Fruits", id })),
              //add list tag to the cache
              { type: "Fruits", id: "PARTIAL-LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Fruits", id: "PARTIAL-LIST" }],
    }),
    getById: builder.query({
      query: (id) => `getById?id=${id}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [{ type: "Fruits", id: result.id }]
          : [],
    }),
    getTotalCount: builder.query({
      query: () => `getTotalCount`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [{ type: "Fruits", id: "TOTAL-COUNT" }]
          : [],
    }),
    createFruit: builder.mutation({
      query(request) {
        return {
          url: `create`,
          method: "POST",
          body: {
            name: request.name,
            description: "A new fruit",
          },
        };
      },
      //THIS WORKS!
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const optimisticUpdate = dispatch(
          fruitApi.util.updateQueryData("getTotalCount", undefined, (draft) => {
            return ++draft;
          })
        );
        try {
          const { data } = await queryFulfilled;
        } catch (e) {
          optimisticUpdate.undo();
          console.log(e);
        }
      },
      invalidatesTags: [
        { type: "Fruits", id: "LIST" },
        { type: "Fruits", id: "TOTAL-COUNT" },
        { type: "Fruits", id: "PARTIAL-LIST" },
      ],
    }),
    updateFruit: builder.mutation({
      query(request) {
        return {
          url: `update`,
          method: "PUT",
          body: {
            id: request.id,
            name: request.name,
            description: request.description,
          },
        };
      },
      //THIS DOESN'T WORK!
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        console.log(request); //request is correct
        const id = request.id;
        console.log(id); //id is correct
        const optimisticUpdate = dispatch(
          fruitApi.util.updateQueryData("getById", id, (draft) => {
            console.log("hi mom"); //I'm not getting this..
            console.log(request);
            return Object.assign(draft, request);
          })
        );
        try {
          await queryFulfilled;
        } catch (e) {
          optimisticUpdate.undo();
          console.log(e);
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Fruits", id: "LIST" },
        { type: "Fruits", id: "TOTAL-COUNT" },
        { type: "Fruits", id: "PARTIAL-LIST" },
        { type: "Fruits", id },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllQuery,
  useGetByIdQuery,
  useGetByPageQuery,
  useCreateFruitMutation,
  useGetTotalCountQuery,
  useUpdateFruitMutation,
} = fruitApi;
