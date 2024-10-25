  import { Component, OnInit } from '@angular/core';
  import { fetchInvoiceListData } from 'src/app/store/Invoices/invoice.action';
  import { Store } from '@ngrx/store';
  import { selectData } from 'src/app/store/Invoices/invoice-selector';
@Component({
  selector: 'app-bibliotecario',
  templateUrl: './bibliotecario.component.html',
  styleUrls: ['./bibliotecario.component.css']
})
export class BibliotecarioComponent implements OnInit {
  
    // bread crumb items
    breadCrumbItems: Array<{}>;
  
    invoicelists: any
  
    constructor(public store: Store) { }
  
    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Invoice List', active: true }];
  
      /**
     * fetches data
     */
      this.store.dispatch(fetchInvoiceListData());
      this.store.select(selectData).subscribe(data => {
        this.invoicelists = data;
      })
    }
  }
  