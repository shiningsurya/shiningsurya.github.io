var dat = new Date();
var md = dat.getHours() * 60 + dat.getMinutes();
var mds = [20, 50, 80, 110, 140, 155, 200, 260, 320, 350, 380, 410, 440, 455, 470, 500, 560, 590, 620, 635, 650, 680, 710, 740, 770, 800, 830, 860, 875, 920, 980, 1040, 1070, 1100, 1130, 1160, 1175, 1190, 1220, 1280, 1310, 1340, 1355, 1370, 1400, 1430];
for(var i=0;i < mds.length;i++) {
		if(md < mds[i]) {
				md = mds[i];
				break;
		} 
}
document.getElementById("fourtwozero").src = "https://shiningsuryarao.com/assets/img/four_/" + md + ".png";
