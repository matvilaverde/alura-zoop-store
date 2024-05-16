import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Product } from '../../../types/product.inteface';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product template', () => {
    const product: Product = {
      id: 1,
      title: 'iPhone 15',
      price: '1000',
      category: 'electronic',
      description: 'smartphone',
      image: 'src/assets/image.png'
    }

    component.product = product;
    fixture.detectChanges();

    const productImg = fixture.debugElement.query(By.css('img')).nativeElement;
    const productTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    const productDescription = fixture.debugElement.query(By.css('p')).nativeElement;
    const productPrice = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(productImg.src).toContain(product.image);
    expect(productTitle.textContent).toContain(product.title);
    expect(productDescription.textContent).toContain(product.description);
    expect(productPrice.textContent).toContain(product.price);
  });

  fit('should emit onDelete event on delete click', () => {
    const product: Product = {
      id: 2,
      title: 'Samsung S22',
      price: '950',
      category: 'electronic',
      description: 'smartphone',
      image: 'src/assets/image.png'
    }

    component.product = product;
    fixture.detectChanges();

    const spy = spyOn(component.onDelete, 'emit');

    component.isManagable = true;

    fixture.detectChanges();

    const managableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(managableElement).not.toBeNull();

    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(product);
  });
});
