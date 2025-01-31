import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";

import styles from './BookList.module.css';
import { sortByTitle, sortByAuthor, sortByPublisher } from '../redux/bookSlice';

const BooksList = () => {
    const { books, filteredBooks, status, error } = useSelector(state => state.books);
    const dispatch = useDispatch();
    let Titles = [];
    let Authors = [];
    let Publishers = [];

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    if (status == 'OK') {
        for (let el of books) {
            Titles.push(el.title);
            Authors.push(el.author)
            Publishers.push(el.publisher);
        }

        let TitlesSet = new Set(Titles);
        Titles = Array.from(TitlesSet);

        let AuthorsSet = new Set(Authors);
        Authors = Array.from(AuthorsSet);

        let PublishersSet = new Set(Publishers);
        Publishers = Array.from(PublishersSet);
    }

    const handleSorting = (key, sortingCriteria) => {
        if (key == 'title') {
            dispatch(
                sortByTitle(sortingCriteria)
            )
        }
        else if (key == 'author') {
            dispatch(
                sortByAuthor(sortingCriteria)
            )
        }
        else if (key == 'publisher') {
            dispatch(
                sortByPublisher(sortingCriteria)
            )
        }
    }

    return (
        <>
            {/* <header className={styles.header}>Books List"</header> */}
            {
                status == 'OK' &&
                <div className={styles.main}>
                    <div className={styles.filter_section_container}>
                        <div className={styles.filter_section}>
                            <div className="dropdown-center">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort books by title</button>
                                <ul className="dropdown-menu">
                                    {
                                        Titles.map((title) => (
                                            <li key={title} onClick={() => handleSorting('title', title)}><a className="dropdown-item" href="#">{title}</a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className={styles.filter_section}>
                            <div className="dropdown-center">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort books by author</button>
                                <ul className="dropdown-menu">
                                    {
                                        Authors.map((author) => (
                                            <li key={author} onClick={() => handleSorting('author', author)}><a className="dropdown-item" href="#">{author}</a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className={styles.filter_section}>
                            <div className="dropdown-center">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort books by publisher</button>
                                <ul className="dropdown-menu">
                                    {
                                        Publishers.map((publisher) => (
                                            <li key={publisher} onClick={() => handleSorting('publisher', publisher)}><a className="dropdown-item" href="#">{publisher}</a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            filteredBooks.map((book) => (
                                <div key={book.title} className={styles.bookcard}>
                                    <img src={book.book_image} alt={book.title} height='150px' />
                                    <div className={styles.bookDetails}>
                                        <h2>{book.title}</h2>
                                        <div className={styles.author_publisher}>
                                            <p>Publisher: {book.publisher}</p>
                                            <p>Author: {book.author}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default BooksList;
