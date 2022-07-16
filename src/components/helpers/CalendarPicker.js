import React, { Component} from "react";
import DatePicker from "react-datepicker";
import "../CalendarPicker.css";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc)
dayjs.extend(timezone)

class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ value: new Date() });
  }

  handleChange = (event) => {
    this.props.getDate(event);
    this.setState({ value: new Date(event) });
  };

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
        <div className="flex flex-row">
          <div className="relative mt-2">
            <DatePicker
              className="h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              selected={this.state.value}
              wrapperClassName="self-end text-center"
              onChange={(date) => this.handleChange(date)}
            />
          </div>
        </div>
    );
  }
}

export default CalendarPicker;
