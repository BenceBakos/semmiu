from pathlib import Path
from random import randint
i=0
sampleText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Luctus accumsan tortor posuere ac. Vel pretium lectus quam id leo. Malesuada proin libero nunc consequat interdum varius sit amet. Elit ut aliquam purus sit amet. Cursus sit amet dictum sit amet justo. Risus at ultrices mi tempus. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Pulvinar pellentesque habitant morbi tristique senectus et netus. Cursus turpis massa tincidunt dui ut ornare lectus sit. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Iaculis eu non diam phasellus vestibulum lorem. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Tempus urna et pharetra pharetra massa."
sampleTitle="PostTitle"
sampleDate="2019.15.32"
titleList=""
while i<40:
	title=sampleTitle+str(i)
	Path('./posts/'+title+'.txt').write_text(title+'\n'+sampleDate+'\n'+str(i)+sampleText[0:randint(50,len(sampleText)-51)])
	titleList+=title+'\n'
	i+=1
	
Path('postList.txt').write_text(titleList)