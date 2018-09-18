const MenuItem = videojs.getComponent('MenuItem');


class SourceMenuItem extends MenuItem
{
  constructor(player, options)
  {
    options.selectable = true;
    super(player, options);
    const qualityLevels = this.player().qualityLevels();
    qualityLevels.on('change', videojs.bind(this, this.update));
    //this.player.on('resolutionchange', videojs.bind(this, this.update));
  }

  handleClick()
  {
    console.log("Change quality to "+this.options_.label);
    console.log("qualityLevels: ");
    console.log(this.player().qualityLevels());
    this.selected_=true;
    this.selected(true);
    for(var i = 0; i < this.player().qualityLevels().length; i++)
    {
      //If this is the Auto option, enable all renditions for adaptive selection
      if(this.options_.index == this.player().qualityLevels().length)
      {
        this.player().qualityLevels()[i].enabled = true;
      }
      else if(i == this.options_.index)
      {
        this.player().qualityLevels()[i].enabled = true;
      }
      else
      {
        this.player().qualityLevels()[i].enabled = false;
      }
    }
  }

  update()
  {
    var selection = this.player().qualityLevels().selectedIndex;
    console.log(this.options_.index+" == "+selection);
    console.log("menuItem.index === qualityLevels().selectedIndex");
    this.selected(this.options_.index == selection);
    this.selected_ = (this.options_.index === selection);
  }
}
export default SourceMenuItem;
