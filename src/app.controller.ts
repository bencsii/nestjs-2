import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Kezdooldal',
    };
  }

  @Get('color-picker')
  @Render('color-picker')
  showColorPicker() {
    return {
      title: 'Szinkivalaszto',
      color: '#000000',
    };
  }

  @Post('color-picker')
  @Render('color-picker')
  changeColor(@Body('color') color: string) {
    return {
      title: 'Szinkivalaszto',
      color: color || '#000000',
    };
  }

  @Get('quadratic')
  @Render('quadratic')
  showQuadratic() {
    return {
      title: 'Masodfoku egyenlet',
      a: '',
      b: '',
      c: '',
      result: '',
    };
  }

  @Post('quadratic')
  @Render('quadratic')
  calculateQuadratic(@Body() values: { a: string; b: string; c: string }) {
    const a = Number(values.a);
    const b = Number(values.b);
    const c = Number(values.c);
    let result = '';

    if (a === 0) {
      result = 'Az a erteke nem lehet 0.';
    } else {
      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) {
        result = 'Az egyenletnek nincs valas megoldasa.';
      } else {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        result = `x1 = ${x1}, x2 = ${x2}`;
      }
    }

    return {
      title: 'Masodfoku egyenlet',
      a: values.a,
      b: values.b,
      c: values.c,
      result,
    };
  }

  @Get('intro')
  @Render('intro')
  showIntro() {
    return this.getIntroData('hu');
  }

  @Post('intro')
  @Render('intro')
  changeIntroLanguage(@Body('language') language: string) {
    return this.getIntroData(language);
  }

  @Get('afa')
  @Render('afa')
  showAfa() {
    return {
      title: 'AFA szamitas',
      netPrice: '',
      category: 'food',
      result: '',
    };
  }

  @Post('afa')
  @Render('afa')
  calculateAfa(@Body() values: { netPrice: string; category: string }) {
    const netPrice = Number(values.netPrice);
    const rates = {
      food: 0,
      book: 5,
      electronics: 27,
    };
    const rate = rates[values.category as keyof typeof rates] ?? 0;
    const grossPrice = netPrice * (1 + rate / 100);

    return {
      title: 'AFA szamitas',
      netPrice: values.netPrice,
      category: values.category,
      result: `Brutto ar: ${grossPrice}`,
    };
  }

  private getIntroData(language: string) {
    if (language === 'en') {
      return {
        title: 'Introduction',
        language: 'en',
        introduction:
          'Some introduction text here : ) ',
      };
    }

    return {
      title: 'Bemutatkozas',
      language: 'hu',
      introduction:
        'Bemutatkozo text itt van : ) ',
    };
  }
}
