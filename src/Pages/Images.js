import React from "react";
import "./Result.css";
import { useStateValue } from "../StateProvider/StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RoomIcon from "@mui/icons-material/Room";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Search from "../component/Search";
function Images() {
  const [{ term = "tesla" }, dispatch] = useStateValue();
  //Live API Call
  const { data } = useGoogleSearch(term);
  //   const data = Response;

  return (
    <>
      <div className="result">
        <div className="result_header">
          <Link to="/">
            <img
              className="result_logo"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt=""
            />
          </Link>
          <div className="result_headerBody">
            <Search hideButtons />
            <div className="result_option">
              <div className="result_optionLeft">
                <div className="result_option">
                  <SearchIcon />
                  <Link to="/all">All</Link>
                </div>
                <div className="result_option">
                  <DescriptionIcon />
                  <Link to="/news">News</Link>
                </div>
                <div className="result_option">
                  <ImageIcon />
                  <Link to="/images">Images</Link>
                </div>
                <div className="result_option">
                  <LocalOfferIcon />
                  <Link to="/shopping">Shopping</Link>
                </div>
                <div className="result_option">
                  <RoomIcon />
                  <Link to="/map">Map</Link>
                </div>
                <div className="result_option">
                  <MoreVertIcon />
                  <Link to="/more">More</Link>
                </div>
              </div>
              <div className="result_optionRight">
                <div className="result_option">
                  <Link to="/settings">Settings</Link>
                </div>
                <div className="result_option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {term && (
          <div className="result_searchPage">
            {data?.items.map((item) => (
              <div className="searchPage_result">
                  {
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                      className="resultImage"
                    />
                  }
                </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Images;
