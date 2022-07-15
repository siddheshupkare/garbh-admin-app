import { Injectable } from '@angular/core';

const MENUITEMS=[{
  name: "Book Codes",
  navigationUrl: "book-promocode",
  menuIcon:"assets/images/book.svg",
  color:"linear-gradient(90deg,#ffbf96,#fe7096)"
},{
  name: "Books",
  navigationUrl: "add-book",
  menuIcon:"assets/images/book.svg",
  color:"linear-gradient(90deg,#90caf9,#047edf 99%)"
},
{
  name: "Yogasana Videos",
  navigationUrl: "addyogasanvideos",
  menuIcon:"assets/images/yoga.png",
  color:"linear-gradient(90deg,#84d9d2,#07cdae)"

},
{
    name: "Motivational Videos",
    navigationUrl: "motivationalqyotes",
    menuIcon:"assets/images/video.png",
    color:"linear-gradient(90deg,#ebb159a6,#f1a213)"

},
{
    name:"Music And Sholks",
    navigationUrl: "musicandshloks",
    menuIcon:"assets/images/music.svg",
    color:"linear-gradient(90deg,#bc6fe3a6,#b32cdf)"
},
{
  name: "Tasks",
navigationUrl: "tasks",
menuIcon:"assets/images/book.svg",
color:"linear-gradient(90deg,#ffbf96,#fe7096)"
},
{
  name: "Shloks",
  navigationUrl: "shlok",
  menuIcon:"assets/images/book.svg",
  color:"linear-gradient(90deg,#90caf9,#047edf 99%)"
},
{
    name: "Special Videos",
    navigationUrl: "special-video",
    menuIcon:"assets/images/video.png",
    color:"linear-gradient(90deg,#ebb159a6,#f1a213)"

},
]
@Injectable({
  providedIn: 'root'
})
export class DashboardMenu {
  getMenuitem() {
    return MENUITEMS;
}}
