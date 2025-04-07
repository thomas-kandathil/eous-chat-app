import { inject, Pipe, PipeTransform } from '@angular/core';
import { CryptoService } from './crypto.service';

@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {

  cryptoService = inject(CryptoService);
  transform(value: string, ...args: unknown[]): unknown {
    return this.cryptoService.decryptMessage(value);
  }

}
