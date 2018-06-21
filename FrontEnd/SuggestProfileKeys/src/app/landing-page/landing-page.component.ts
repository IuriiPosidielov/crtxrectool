import { Injectable, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Component } from '@angular/core';
import { ProfileKeysItemsService, RecommendationState, ProfileKeyItem} from '../profilekeys-items.service'
declare var window;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChildren('chkbx') checkboxes;
  
  recState: RecommendationState;
  public checkboxesIds: string[];
  public checked: boolean[];

  constructor(
    public profileKeysItemService: ProfileKeysItemsService
  ) { }

  ngAfterViewInit()
  {
      //console.log("view child");
      //this.checkboxesIds = this.checkboxes._results.map(el => el.nativeElement.value);
      //console.log(this.checkboxesIds);
  }

  ngOnInit()
  {
  	console.log(this.profileKeysItemService.showMessage());
    this.profileKeysItemService.fetchProfileKeys("110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9").subscribe(
      res => {
      this.recState = res;
      
    /*    let obj: any = {
        "ContextItemId": "110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9",
        "Tags": [
          {
            "Id": "2a257a98-aac1-4722-83b6-f1aca5d419ab",
            "TagName": "Bike Trip"
          },
          {
            "Id": "67f14f6b-dc78-4e69-a428-947b3bd6b9ad",
            "TagName": "Museums"
          },
          {
            "Id": "1c638eef-af05-4c04-9403-1fdb21f545ee",
            "TagName": "Amsterdam"
          },
          {
            "Id": "6c89980b-c828-42fa-a6ad-8d93d7e03344",
            "TagName": "Picnic"
          }
        ]
      };
      */
      //this.recState = obj;
      
      let n:number = this.recState.ProfileKeys.length;
      this.checkboxesIds =[];
      this.checked =new Array(n).fill(false);
      this.recState.ProfileKeys.forEach(element => {
          this.checkboxesIds.push(element.ProfileKeyId)
      });
    }); // subscribe end
  }

  changeCheckbox(evnt, ind)
  {
    this.checked[ind] = !this.checked[ind];
  }

  saveProfileKeys() {
    var arr = [];
    this.checked.forEach((el, i) => {
      if (el) {
        arr.push(this.checkboxesIds[i]);
      }
    });
    /*
    console.log (arr);
    this.profileKeysItemService.saveProfileKeys(this.recState.ContextItemId, arr).subscribe(
      res => {
        console.log("res");
        console.log(res);
      });
    */
   window.top.dialogClose();
  }
}
