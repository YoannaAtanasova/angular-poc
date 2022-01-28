import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Apollo, gql} from 'apollo-angular';

const GRAPH_ENDPOINT = 'https://localhost:7048/graphql';

type ProfileType = {
  name?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  movie!: ProfileType;

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
   

      this.apollo
      .watchQuery({
        query: gql`
          {
            movie(id: "72d95bfd-1dac-4bc2-adc1-f28fd43777fd") {
            id
            name
            reviews {
              reviewer
              stars
            }
          }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.movie = result?.data?.movie;
      });
  }
}