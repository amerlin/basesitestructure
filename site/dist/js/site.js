var Site = /** @class */ (function () {
    function Site() {
        this.init();
        this.initButton();
    }
    Site.prototype.init = function () {
        console.log("Init class");
    };
    Site.prototype.initButton = function () {
        console.log("Init button");
        $('#btnClick').click(function (event) {
            console.log("click button");
        });
    };
    return Site;
}());
var mySite = new Site();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFFSTtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsbUJBQUksR0FBSjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHlCQUFVLEdBQVY7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTNCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxLQUFLO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUwsV0FBQztBQUFELENBckJBLEFBcUJDLElBQUE7QUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6InNpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTaXRlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbml0IGNsYXNzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRCdXR0b24oKXtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbml0IGJ1dHRvblwiKTtcclxuXHJcbiAgICAgICAgJCgnI2J0bkNsaWNrJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIGJ1dHRvblwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5sZXQgbXlTaXRlID0gbmV3IFNpdGUoKTtcclxuIl19
