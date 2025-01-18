import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import regeneratorRuntime from 'regenerator-Runtime'

export const fetchBooks = createAsyncThunk('books/fetchBooks', 
    async () => {
        const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=2efxSrTRkpSbA1iC4QS8SC8P0hd6Pj2V`);
        return res.json();
    }
)

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        filteredBooks: [],
        status: 'idle',
        error: null
    },
    reducers: {
        sortByTitle: (state, action) => {
            state.filteredBooks = state.books.filter((book) => book.title == action.payload);
        },
        sortByAuthor: (state, action) => {
            state.filteredBooks = state.books.filter((book) => book.author == action.payload);
        },
        sortByPublisher: (state, action) => {
            state.filteredBooks = state.books.filter((book) => book.publisher == action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                const {results, status} = action.payload;
                state.status = status;
                state.books = results.books;
                state.filteredBooks = results.books;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                // const {results, status} = action.payload;
                // state.error = action.error.message;
                state.error = 'failed';
            })
    }
})

export const {sortByTitle, sortByAuthor, sortByPublisher} = bookSlice.actions;
export default bookSlice.reducer;