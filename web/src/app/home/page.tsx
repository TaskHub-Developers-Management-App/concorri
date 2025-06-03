'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import heroImg from '@/assets/hero.jpg';
import { Logo } from '@/components/logo';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            <header className="w-full px-6 py-4 border-b flex justify-between items-center">
                <Logo />
                <Button color="primary">
                    <Link href="/auth/login">Entrar</Link>
                </Button>
            </header>

            <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-10">
                <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Automatize seus sorteios promocionais com o <span className="text-primary">Concorri</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        Esqueça o preenchimento manual de cupons. Agilize seu processo, informe seus clientes e
                        torne seus sorteios mais eficientes e organizados.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button size="lg" color="primary" startContent={<RocketLaunchIcon className="w-5 h-5" />}>
                            <Link href="/auth/signup">Começar Agora</Link>
                        </Button>
                        <Button size="lg" variant="light">
                            Saiba Mais
                        </Button>
                    </div>
                </div>
                <div className="flex-1">
                    <Image src={heroImg} alt="Ilustração Concorri" width={600} height={400} />
                </div>
            </section>

            <section id="features" className="bg-gray-50 px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Funcionalidades que fazem a diferença
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: 'Geração Automática de Cupons',
                                description: 'Clientes preenchem apenas uma vez. O sistema gera automaticamente todos os cupons necessários, prontos para impressão.'
                            },
                            {
                                title: 'Notificações via WhatsApp',
                                description: 'Seus clientes são informados sobre participação, quantidade de cupons, data do sorteio, resultados e muito mais.'
                            },
                            {
                                title: 'Facilidade na Impressão',
                                description: 'Gere cupons organizados e prontos para impressão, sem erros e sem retrabalho para sua equipe.'
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm border">
                                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer id="contact" className="border-t px-8 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Concorri. Todos os direitos reservados.
            </footer>
        </div>
    );
}
