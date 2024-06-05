import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
    name: 'author',
    initialState: {
        authors: [],
        isLoadingTableAuthor: false,
        paginationListAuthor: {
            currentPage: 1,
            perPage: 10,
            totalPage: 1,
            totalRecord: 0,
        },
        visibleModalCreateOrUpdateAuthor: false,
        visibleModalDeleteAuthor: false,
        isLoadingBtnCreateOrUpdateAuthor: false,
        isLoadingBtnDeleteAuthor: false,
        errorCreateAuthor: {
            name: '',
            email: '',
            phone: '',
            bio: '',
        },
    },
    reducers: {
        setErrorCreateAuthor: (state, action) => ({
            ...state,
            errorCreateAuthor: action.payload
        }),
        setVisibleModalCreateAuthor: (state, action) => ({
            ...state,
            visibleModalCreateAuthor: action.payload
        }),
        startRequestGetAuthorList: (state) => ({
            ...state,
            authors: [],
            isLoadingTableAuthor: true
        }),
        startRequestGetAuthorListSuccess: (state, action) => ({
            ...state,
            authors: action.payload.data.authors,
            isLoadingTableAuthor: false,
            paginationListAuthor: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalPage: Math.ceil(action.payload.data.total / action.payload.data.per_page),
                totalRecord: action.payload.data.total
            }
        }),
        startRequestGetAuthorListFail: (state) => ({
            ...state,
            authors: [],
            isLoadingTableAuthor: false
        }),

    }
});

export const {
    setVisibleModalCreateAuthor,
    setErrorCreateAuthor,
    startRequestGetAuthorList, startRequestGetAuthorListSuccess, startRequestGetAuthorListFail,
} = authorSlice.actions;

export default authorSlice.reducer;