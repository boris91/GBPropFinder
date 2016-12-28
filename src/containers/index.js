import AuthView from './auth/view';
import LoginView from './login/view';
import SearchView from './search/view';
import SearchResultsView from './search-results/view';
import SearchResultDetailsView from './search-result-details/view';

export const Auth = AuthView.connect();
export const Login = LoginView.connect();
export const Search = SearchView.connect();
export const SearchResults = SearchResultsView.connect();
export const SearchResultDetails = SearchResultDetailsView.connect();