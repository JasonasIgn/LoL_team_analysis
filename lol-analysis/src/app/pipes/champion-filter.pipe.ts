import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/';

@Pipe({
  name: 'championFilter'
})

export class ChampionFilterPipe implements PipeTransform {

    a: RegExp;
  transform(items: any, input: string): any {
    if (items == null) {
      return [];

        
    }
    this.a = new RegExp(input.toLocaleLowerCase());
    return items.filter(i => this.a.test(i.name.toLowerCase()));
  }
}
