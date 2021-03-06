import React, { Component } from "react";
import "./scriptSave.css";
import { SpeakerSelectOption } from "../../container";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../index";
class ScriptSave extends Component {
  state = {
    allScript: [],
    script: [],
    castPart: [],
    speaker: ["스피커1", "스피커2", "스피커3"],
    checkedBox: [],
  };
  componentDidMount = () => {
    Axios({
      url: `${API()}/scriptSaveCall`,
      method: "get",
    })
      .then((res) => {
        console.log(res);
        var titleArray = [],
          castPartArray = [],
          speakerArray = [],
          filterArray = [],
          checkedBoxArray = [],
          allScriptArray = null;
        //userChoice == 1 Array choice
        allScriptArray = res.data.scriptList.script;
        for (
          let index = 0;
          index < res.data.scriptList.script.length;
          index++
        ) {
          if (res.data.scriptList.script[index].userChoice.title == "1") {
            filterArray.push(res.data.scriptList.script[index]);
          }

          checkedBoxArray.push(false);
        }
        //filtering Array extract title and char
        for (let index = 0; index < filterArray.length; index++) {
          titleArray.push(filterArray[index].title);
          castPartArray.push(filterArray[index].act.char);
        }
        for (let index = 0; index < res.data.ipArray.length - 2; index++) {
          speakerArray.push(`스피커${index + 1}`);
        }

        this.setState({
          allScript: allScriptArray,
          script: titleArray,
          castPart: castPartArray,
          speaker: speakerArray,
          checkedBox: checkedBoxArray,
        });
      })
      .catch((err) => console.log(err));
  };
  ActiveRoleSelectState = (index) => {
    document.getElementsByClassName("speakerSelectOption")[
      index
    ].style.display = "block";
  };
  InactiveRoleSelectState = (index) => {
    document.getElementsByClassName("speakerSelectOption")[
      index
    ].style.display = "none";
  };

  SaveRole = (index, arr) => {
    console.log(index, arr);
    console.log();
    if (arr.speakerIndex.indexOf("") == -1) {
      //만약 공백이 없다면
      Axios({
        url: `${API()}/scriptListSave`,
        method: "post",
        data: { index: index, arr: arr },
      })
        .then((res) => {
          console.log(res);
          alert("update!");
        })
        .catch((err) => console.log(err));
      document.getElementsByClassName("speakerSelectOption")[
        index
      ].style.display = "none";
    } else {
      alert("모든 역할에 대해 설정해 주셔야 합니다.");
    }
  };
  ChangeScriptCheckState = (index) => {
    var scriptIndex = 0;
    for (let id = 0; id < this.state.allScript.length; id++) {
      if (index == this.state.allScript[id].title) {
        scriptIndex = id;
        break;
      }
    }
    let temp = this.state.checkedBox;
    temp[scriptIndex] = !temp[scriptIndex];
    this.setState({ checkedBox: temp });
    console.log(this.state.checkedBox);
  };
  DeleteScript = () => {
    Axios({
      url: `${API()}/scriptListDelete`,
      method: "delete",
      data: { checkedBox: this.state.checkedBox },
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        {this.state.castPart.map((index, i) => (
          <SpeakerSelectOption
            castPart={index}
            speaker={this.state.speaker}
            key={i}
            index={i}
            InactiveRoleSelectState={this.InactiveRoleSelectState}
            SaveRole={this.SaveRole}
          />
        ))}

        <div>
          <div className="pageInfo">
            <img
              src="img/backbutton.svg"
              className="backbutton"
              alt="backbutton"
              onClick={() => (window.location.href = "/")}
            />
            대본 저장소
          </div>
          <form name="script_area">
            <div className="script_area">
              {this.state.script.map((index, i, key) => (
                <div
                  className="each_script"
                  onDoubleClick={() => this.ActiveRoleSelectState(i)}
                  key={i}
                  index={i}
                >
                  <input
                    type="checkbox"
                    name={index}
                    value={index}
                    onClick={() => this.ChangeScriptCheckState(index)}
                  />
                  {index}
                </div>
              ))}
            </div>

            <div className="scriptBottom">
              <Link to="/scriptList">
                <button type="button" className="bottomDiv">
                  대본 추가
                </button>
              </Link>
              <button
                type="button"
                className="bottomDiv"
                onClick={this.DeleteScript}
              >
                대본 삭제
              </button>
              <Link to="/playList">
                <button type="button" className="bottomDiv">
                  재생 목록 이동
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ScriptSave;
